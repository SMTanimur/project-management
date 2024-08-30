import { useBotPropertyStore } from '@/store/botfllow';
import { NodeType } from '@/types';
import TriggerForm from './trigger-form';
import FileGenerateForm from './file-generate-form';
import TextToJsonForm from './text-to-json-form';
import GenerativeAIForm from './generative-ai-form';
import SendEmailForm from './send-email-form';
import ConditionNodeForm from './condition-form';
import TimerNodeForm from './timer-form';

export const RenderSwitchForm = () => {
  const { botNodeData } = useBotPropertyStore();
  switch (botNodeData?.type) {
    case NodeType.TRIGGER:
      return <TriggerForm />;
    case NodeType.FILEGENARATOR:
      return <FileGenerateForm />;
    case NodeType.TEXTTOJSON:
      return <TextToJsonForm />;
    case NodeType.GENERATIVEAI:
      return <GenerativeAIForm />;
    case NodeType.SENDEMAIL:
      return <SendEmailForm />;
    case NodeType.TIMER:
      return <TimerNodeForm />;

    case NodeType.CONDITION:
      return <ConditionNodeForm />;

    default:
      return <TriggerForm />;
  }
};
