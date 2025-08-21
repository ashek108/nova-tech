"use client";

import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

const Page = () => {
  const trpc = useTRPC();
  // const { data } = useQuery()
  return (
    <div>
      Hello World!
    </div>
  )
}

export default Page;