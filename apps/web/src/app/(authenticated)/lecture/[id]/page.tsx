'use client'

import { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Typography, Spin, Space } from 'antd'
import { AudioOutlined, ReadOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function LectureDetailsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { enqueueSnackbar } = useSnackbar()
  const [lecture, setLecture] = useState<Model.Lecture | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const lectureFound = await Api.Lecture.findOne(params.id, {
          includes: ['user', 'transcriptions'],
        })
        setLecture(lectureFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch lecture details', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    fetchLecture()
  }, [params.id])

  const navigateToTranscription = () => {
    router.push(`/lecture/${params.id}/transcription`)
  }

  const navigateToListen = () => {
    router.push(`/lecture/${params.id}/listen`)
  }

  if (loading) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Row justify="center">
        <Col span={24}>
          <Card>
            <Space direction="vertical" size="middle">
              <Title level={2}>{lecture?.title || 'Lecture Details'}</Title>
              <Paragraph>
                {lecture?.description || 'No description available.'}
              </Paragraph>
              <Text strong>
                Presented by: {lecture?.user?.name || 'Unknown'}
              </Text>
              <Row gutter={16}>
                <Col>
                  <Button
                    type="primary"
                    icon={<ReadOutlined />}
                    onClick={navigateToTranscription}
                  >
                    View Transcription
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="default"
                    icon={<AudioOutlined />}
                    onClick={navigateToListen}
                  >
                    Listen to Lecture
                  </Button>
                </Col>
              </Row>
            </Space>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
