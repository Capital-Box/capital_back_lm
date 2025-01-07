export type IException = {
  id: string;
  code: string;
  title: string;
  detail: string;
  source?: {
    pointer?: string;
    parameter?: string;
    header?: string;
  }
  links?: {
    about?: string;
    type?: string;
  }
}