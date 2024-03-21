'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Spin, Space, Row, Col, Button } from 'antd'
import { FileTextOutlined, AudioOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function LectureTranscriptionPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { enqueueSnackbar } = useSnackbar()
  const [lecture, setLecture] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const lectureData = await Api.Lecture.findOne(params.id, {
          includes: ['transcriptions'],
        })
        setLecture(lectureData)
      } catch (error) {
        enqueueSnackbar('Failed to fetch lecture data', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    fetchLecture()
  }, [params.id])

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>
          <FileTextOutlined /> Lecture Transcription
        </Title>
        {loading ? (
          <Spin size="large" />
        ) : (
          <div>
            {lecture ? (
              <>
                <Title level={3}>{lecture.title}</Title>
                <Text type="secondary">
                  Created at: {dayjs(lecture.dateCreated).format('DD MMM YYYY')}
                </Text>
                <Paragraph>{lecture.description}</Paragraph>
                <Row gutter={[16, 16]}>
                  {lecture.transcriptions?.map((transcription, index) => (
                    <Col key={index} xs={24} sm={12} md={8} lg={6} xl={4}>
                      <Text>{transcription.textContent}</Text>
                    </Col>
                  ))}
                </Row>
                <Button
                  type="primary"
                  icon={<AudioOutlined />}
                  onClick={() => router.push(`/lecture/${params.id}/listen`)}
                >
                  Listen to Lecture
                </Button>
              </>
            ) : (
              <Text>
                Sorry, we couldn't find the lecture you're looking for.
              </Text>
            )}
          </div>
        )}
      </Space>
    </PageLayout>
  )
}
