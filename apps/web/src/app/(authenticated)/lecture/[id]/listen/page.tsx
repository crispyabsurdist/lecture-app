'use client'

import React, { useEffect, useState } from 'react'
import { Button, Typography, Space, Row, Col, Card } from 'antd'
import { PlayCircleOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ListentoLecturePage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [lecture, setLecture] = useState(null)

  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const lectures = await Api.Lecture.findManyByUserId(userId, {
          includes: ['transcriptions'],
        })
        const currentLecture = lectures.find(lec => lec.id === params.id)
        if (!currentLecture) {
          enqueueSnackbar('Lecture not found', { variant: 'error' })
          router.push('/lectures')
        } else {
          setLecture(currentLecture)
        }
      } catch (error) {
        enqueueSnackbar('Failed to fetch lecture', { variant: 'error' })
      }
    }

    if (userId) {
      fetchLecture()
    }
  }, [userId, params.id, router])

  const handlePlayAudio = () => {
    if (lecture?.audioFilePathUrl) {
      const audio = new Audio(lecture.audioFilePathUrl)
      audio.play().catch(error => {
        enqueueSnackbar('Error playing audio', { variant: 'error' })
      })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Listen to Lecture</Title>
        <Text>
          Here you can listen to the audio version of the lecture's
          transcription.
        </Text>
        {lecture && (
          <Row gutter={[16, 16]} justify="center">
            <Col xs={24} sm={12} md={8}>
              <Card
                title={lecture.title}
                actions={[
                  <Button
                    type="primary"
                    icon={<PlayCircleOutlined />}
                    onClick={handlePlayAudio}
                  >
                    Play
                  </Button>,
                ]}
              >
                <Text>{lecture.description}</Text>
              </Card>
            </Col>
          </Row>
        )}
      </Space>
    </PageLayout>
  )
}
