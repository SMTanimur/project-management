"use client"
import { useBotFlowsStore } from '@/store/botfllow/botflows'
import { useParams } from 'next/navigation'
import React from 'react'

const Botflow = () => {
  const { id } = useParams<{
    id: string
  }>()

 const {getBotflowById}= useBotFlowsStore()
 const botflow = getBotflowById(id)
 console.log(botflow)
  return (
    <div>
      ddhdh
    </div>
  )
}

export default Botflow
