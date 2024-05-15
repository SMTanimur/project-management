"use client"
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [open,setOpen]=useState(false);
  return (
    <main className="flex  flex-col items-center justify-between p-24">
     <Button onClick={()=>setOpen(!open)}>
    Modal
     </Button>
     <Modal
        size="sm"
        show={open}
        isAnimated={true}
        animationType="animate__fadeInRight"
        title="Modal Title"
        onClose={() => setOpen(false)}
      >
        <div>
          dgsdkgjdkgjdsg
        </div>
      </Modal>
    </main>
  );
}
