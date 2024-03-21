'use client'

import { CheckCircleOutlined, InboxOutlined } from '@ant-design/icons'
import { Api } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'
import { useAuthentication } from '@web/modules/authentication'
import { Button, Col, Row, Typography, Upload } from 'antd'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
const { Title, Paragraph } = Typography

export default function UploadLecturePage() {
  const router = useRouter()
  const { user } = useAuthentication()
  const { enqueueSnackbar } = useSnackbar()
  const [fileList, setFileList] = useState([])
  const [uploading, setUploading] = useState(false)
  const [transcriptionText, setTranscriptionText] = useState('')
  const [audioUrl, setAudioUrl] = useState('')

  const customRequest = async ({ file, onSuccess, onError }) => {
    setUploading(true)
    try {
      const uploadedAudioUrl = await Api.Upload.upload(file)
      setAudioUrl(uploadedAudioUrl)
      setFileList([
        {
          uid: file.uid,
          name: file.name,
          status: 'done',
          url: uploadedAudioUrl,
        },
      ])
      onSuccess(uploadedAudioUrl, file)
      enqueueSnackbar('File uploaded successfully', { variant: 'success' })
    } catch (error) {
      onError(error)
      enqueueSnackbar('Upload failed', { variant: 'error' })
    } finally {
      setUploading(false)
    }
  }

  const handleUpload = async () => {
    if (!audioUrl) {
      enqueueSnackbar('No audio file uploaded.', { variant: 'error' })
      return
    }
    setUploading(true)
    try {
      const transcription = await Api.Ai.fromAudioToText(audioUrl)
      setTranscriptionText(transcription)
      enqueueSnackbar('Transcription successfully completed', {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar('Transcription failed', { variant: 'error' })
    } finally {
      setUploading(false)
    }
  }

  return (
    <PageLayout>
      <Row justify="center">
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <Title level={2}>Upload Your Lecture</Title>
          <Paragraph>
            Upload your audio files here for transcription. Ensure the audio is
            clear enough for accurate transcription.
          </Paragraph>
          <Upload.Dragger
            name="file"
            fileList={fileList}
            customRequest={customRequest}
            maxCount={1}
            accept="audio/*"
            showUploadList={{
              showRemoveIcon: false,
            }}
            onChange={({ file }) => {
              if (file.status === 'done') {
                handleUpload() // Automatically start transcription after upload
              }
            }}
            disabled={uploading}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single upload. Strictly prohibit from uploading
              company data or other band files
            </p>
          </Upload.Dragger>
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={() => router.push('/lectures')}
            style={{ marginTop: '20px' }}
            disabled={uploading || !transcriptionText}
          >
            Go to My Lectures
          </Button>
          {transcriptionText && (
            <Paragraph style={{ marginTop: '20px' }}>
              Transcription: {transcriptionText}
            </Paragraph>
          )}
        </Col>
      </Row>
    </PageLayout>
  )
}
