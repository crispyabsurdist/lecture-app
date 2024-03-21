'use client'

import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Typography, Space, Modal } from 'antd'
import { PlayCircleOutlined, FileTextOutlined, DeleteOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function MyLecturesPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const [lectures, setLectures] = useState([])

  useEffect(() => {
    if (userId) {
      Api.Lecture.findManyByUserId(userId, { includes: ['transcriptions'] })
        .then(setLectures)
        .catch(() =>
          enqueueSnackbar('Failed to fetch lectures', { variant: 'error' }),
        )
    }
  }, [userId])

  const handleListenClick = lectureId => {
    router.push(`/lecture/${lectureId}/listen`)
  }

  const handleTranscriptionClick = lectureId => {
    router.push(`/lecture/${lectureId}/transcription`)
  }

  const handleDeleteLecture = lectureId => {
    Modal.confirm({
      title: 'Are you sure you want to delete this lecture?',
      onOk: () => {
        Api.Lecture.deleteOne(lectureId)
          .then(() => {
            setLectures(lectures.filter(lecture => lecture.id !== lectureId))
            enqueueSnackbar('Lecture deleted successfully', { variant: 'success' })
          })
          .catch(() => {
            enqueueSnackbar('Failed to delete the lecture', { variant: 'error' })
          })
      },
    })
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>My Lectures</Title>
      <Text>
        Here you can find all your uploaded lectures, access their
        transcriptions, and listen to them.
      </Text>
      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        {lectures?.map(lecture => (
          <Col key={lecture.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              title={lecture.title || 'Untitled Lecture'}
              actions={[
                <PlayCircleOutlined
                  key="listen"
                  onClick={() => handleListenClick(lecture.id)}
                />,
                <FileTextOutlined
                  key="transcription"
                  onClick={() => handleTranscriptionClick(lecture.id)}
                />,
                <DeleteOutlined
                  key="delete"
                  onClick={() => handleDeleteLecture(lecture.id)}
                />,
              ]}
            >
              <Text>{lecture.description || 'No description provided.'}</Text>
              <br />
              <Text type="secondary">
                Uploaded on {dayjs(lecture.dateCreated).format('DD MMM YYYY')}
              </Text>
            </Card>
          </Col>
        ))}
      </Row>
    </PageLayout>
  )
}