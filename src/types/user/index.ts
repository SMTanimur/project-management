
export enum STATUS {
  ONLINE='online',
  OFFLINE='offline',
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  is_active?: boolean;
  provider: string;
  provider_id?: string;
  role: string;
  _id: string;
  contact?: string;
  connection_status: STATUS;
  last_seen: Date;
  email_verified?: boolean;

}
export type ImageInfo = {
  img_url: string;
  img_id: string;
};