
import { z } from "zod";

const IData = z.object({
  name:z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a valid string",
  }).min(3, { message: "Name is must be 3 or more characters long" }),
  type:z.string().nonempty(),
  description:z.string().nonempty()
})
export const ExtractDataSchema = z.object({
  extract_data:z.object({
  data:z.array(IData),
  }).optional(),
  label:z.string().nonempty({
    message: "Label is required"
  }),
  description:z.string().optional()

})

export const TriggerSchema = z.object({
  trigger_data:z.object({
    action:z.string({
      required_error: "Action is required",
      invalid_type_error: "Name must be a valid string",
    }).min(3, { message: "Name is must be 3 or more characters long" }),
   
  }).optional(),
  label:z.string().nonempty({
    message: "Label is required"
  }),
  description:z.string().optional()
  
}

)

export const FileGenerateSchema= z.object({
  fileGenerate_data:z.object({
    file_name:z.string({
      required_error: "File Name is required",
      invalid_type_error: " File Name must be a valid string",
    }).min(2),
    file_type:z.string({
      required_error: "File Name is required",
      invalid_type_error: " File Name must be a valid string",
    }).nonempty({
      message: "File Type is required"
    }),
    content: z.string().optional()
  }),

  label:z.string().nonempty({
    message: "Label is required"
  }),
  description:z.string().optional()

  
})

export const PDFGenarateSchema= z.object({
  pdfGenerate_data:z.object({

  file_name:z.string({
    required_error: "File Name is required",
    invalid_type_error: " File Name must be a valid string",
  })
}),
  label:z.string().nonempty({
    message: "Label is required"
  }),
  description:z.string().optional()
  
})
export const FileReaderSchema= z.object({

  file_name:z.array(z.string({ required_error: 'File should be string' }).trim()),
  collection_file:z.array(z.string({ required_error: 'File should be string' }).trim()).optional(),

  label:z.string().nonempty({
    message: "Label is required"
  }),
  description:z.string().optional()

})

export const TextToJsonSchema=z.object({
  content:z.string({
    required_error: "File Name is required",
    invalid_type_error: " File Name must be a valid string",
  }).nonempty({
    message: "Formatter is required"
  }),
  label:z.string().nonempty({
    message: "Label is required"
  }),
  description:z.string().optional()
})

export const GenerativeAISchema= z.object({
  generativeAI_data:z.object({
  content:z.string({
    required_error: "File Name is required",
    invalid_type_error: " File Name must be a valid string",
  }).min(2),
 
}),
  label:z.string().nonempty({
    message: "Label is required"
  }),
  description:z.string().optional()
})



// Create Zod schemas for each interface with custom error messages
export const SendEmailNodeSchema = z.object({
  sendEmail_data:z.object({
  recipient_email: z.array(z.string().email({ message: "Recipient email must be a valid email" })),
  subject: z.string().nonempty({ message: "Subject is required" }),
  body: z.string().nonempty({ message: "Body is required" }),
  isDelaySend: z.boolean({ required_error: "isDelaySend is required" }),
  sendTime: z.string().optional(),
  }),
  label: z.string().nonempty({ message: "Label is required" }),
  description: z.string().optional(),
});

export const WebsiteScraperNodeSchema = z.object({
  websiteScraper_data:z.object({
  url: z.string().url({ message: "URL must be a valid URL" })

  }),
  label: z.string().nonempty({ message: "Label is required" }),
  description: z.string().optional(),
});

export const FormInputNodeSchema = z.object({
  formInput_data:z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  value: z.string().optional(),
  }),
  label: z.string().nonempty({ message: "Label is required" }),
  description: z.string().optional(),
});

export const TimerNodeSchema = z.object({

  delay: z.string().nonempty({ message: "Delay is required" }),

  label: z.string().nonempty({ message: "Label is required" }),
  description: z.string().optional(),
});

export const CSVInputNodeSchema = z.object({
  csvInput_data: z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  file_mode: z.string().optional(),
  }),
  label: z.string().nonempty({ message: "Label is required" }),
  description: z.string().optional(),
});

export const ConditionNodeSchema = z.object({
  condition_data:z.object({
  if_condition: z
    .object({
      condition: z.string().optional(),
      value: z.string().optional(),
    })
    .optional(),
  else_condition: z
    .object({
      condition: z.string().optional(),
      value: z.string().optional(),
    })
    .optional(),

  }),
  label: z.string().nonempty({ message: "Label is required" }),
  description: z.string().optional(),
});

export const SlackMessageSenderSchema = z.object({
  token: z.string().nonempty({ message: "Token is required" }),
  channel: z.string().nonempty({ message: "Channel is required" }),
  message: z.string().nonempty({ message: "Message is required" }),
  label: z.string().nonempty({ message: "Label is required" }),
  description: z.string().optional(),
})



export const ApiConnectorSchema = z.object({
  method: z.enum(['POST', 'PUT', 'DELETE', 'GET']),
  api_url: z.string().url({ message: 'URL must be a valid URL' }),
  headers: z
    .array(
      z.object({
        key: z.string().nonempty({ message: 'Key is required' }),
        value: z.string().nonempty({ message: 'Value is required' }),
      })
    )
    .min(1, { message: 'At least one header is required' }),
  data: z
    .array(
      z.object({
        data_key: z.string().nonempty({ message: 'Data key is required' }),
        data_value: z.any(),
        data_type: z.string().nonempty({ message: 'Type is required' }),
      })
    )
    .nullable()
    .optional(),
  params: z
    .array(
      z.object({
        param_key: z.string().nonempty({ message: 'param key is required' }),
        param_value: z.any(),
        param_type: z.string().nonempty({ message: 'Type is required' }),
      })
    )
    .nullable()
    .optional(),
  label: z.string().nonempty({ message: 'Label is required' }),
  description: z.string().optional(),
});
