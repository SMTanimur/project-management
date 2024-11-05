import { COLORS_ARRAY } from '@/constants';
import { z } from 'zod';

export const memberSchema = z.object({
  user: z.string().regex(/^[0-9a-fA-F]{24}$/, {
    message: 'User ID must be a valid MongoDB ObjectId',
  }),
  role: z.string({
    required_error: 'Role is required',
    invalid_type_error: 'Role must be a string',
  }),
});

export enum OrganizationType {
  PERSONAL = 'personal',
  BUSINESS = 'business',
}

export const invitationSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email('Invalid email format'),
  invitedBy: z.string(),
  status: z.string({
    required_error: 'Status is required',
    invalid_type_error: 'Status must be a string',
  }),
  invitedAt: z.date({
    required_error: 'Invitation date is required',
    invalid_type_error: 'Invalid date format',
  }),
  organization: z.string(),
});

export const organizationSchema = z.object({
  name: z
    .string({
      required_error: 'Organization name is required',
      invalid_type_error: 'Organization name must be a string',
    })
    .min(1, 'Organization name cannot be empty'),
  owner: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, {
      message: 'Owner ID must be a valid MongoDB ObjectId',
    })
    .optional(),
  description: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    })
    .optional(),

  type: z.nativeEnum(OrganizationType, {
    required_error: 'Organization type is required',
    invalid_type_error: 'Invalid organization type',
  }),
  brandColor: z
    .enum(COLORS_ARRAY as [string, ...string[]], {
      required_error: 'Brand color is required',
      invalid_type_error: 'Brand color must be a string',
    })
    .optional(),
  logo: z.string().optional(),
  logoText: z.string().optional(),
  members: z
    .array(memberSchema, {
      required_error: 'Members array is required',
      invalid_type_error: 'Members must be an array',
    })
    .optional(),
  isDefault: z
    .boolean({
      invalid_type_error: 'isDefault must be a boolean',
    })
    .optional()
    .default(false),

  projects: z
    .array(
      z.string({
        message: 'Project ID must be a valid MongoDB ObjectId',
      }),
      {
        invalid_type_error: 'Projects must be an array',
      }
    )
    .optional(),
});

export const createOrganizationSchema = organizationSchema.pick({
  name: true,
  description: true,
  brandColor: true,
  logo: true,
  type: true,
  logoText: true,
  isDefault: true,
});

export type TCreateOrganization = z.infer<typeof createOrganizationSchema>;

export const updateOrganizationSchema = z.object({
  organizationId: z.string({
    required_error: 'Organization ID is required',
    invalid_type_error: 'Organization ID must be a string',
  }),
  data: organizationSchema.partial(),
});

export type TUpdateOrganization = z.infer<typeof updateOrganizationSchema>;

export const invitationDtoSchema = invitationSchema.pick({
  email: true,
  invitedBy: true,
  organization: true,
});

export type TInvitationDto = z.infer<typeof invitationDtoSchema>;

export const invitationResponseSchema = z.object({
  response: z.enum(['accepted', 'rejected'], {
    required_error: 'Response is required',
    invalid_type_error: 'Response must be either "accepted" or "rejected"',
  }),
});

export type TInvitationResponse = z.infer<typeof invitationResponseSchema>;
