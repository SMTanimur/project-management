"use client"
import { useBotFlowsStore } from '@/store/botfllow/botflows'
import { useParams } from 'next/navigation'
import React from 'react'
import BotSidebar from './sidbar'

const BotScreen = () => {
  const { id } = useParams<{
    id: string
  }>()

 const {getBotflowById}= useBotFlowsStore()
 const botflow = getBotflowById(id)
  return (
    <div className='flex '>
    
      <BotSidebar/>
      <div>
      <h1>{botflow?.name}</h1>
      </div>
      
    </div>
  )
}

export default BotScreen
