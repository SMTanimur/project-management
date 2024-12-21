"use client";



import { CreateBotflowForm, Modal } from "@/components";
import { useUser } from "@/hooks";
import { useGlobalLocalStateStore, useGlobalModalStateStore } from "@/store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";


const GlobalModals = () => {
  const globalModal = useGlobalModalStateStore((state) => state);
  const { currentOrganizationId } = useGlobalLocalStateStore();
  const { push } = useRouter();
  const pathName = usePathname();
  const { data } = useUser();
 
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <div className="">
      <Modal
        size="md"
        title="Write a review"
        isAnimated={true}
        animationType="animate__fadeIn"
        show={globalModal.botflowModalIsOpen}
        onClose={() => globalModal.setBotflowModal(false)}
      >
        <CreateBotflowForm />
      </Modal>
    </div>
  );
};

export default GlobalModals;
