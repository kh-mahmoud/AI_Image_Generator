
export type RenderProps = {
  data: Posts;
  title: string;
};

export type Posts =
  {
    id: string;
    name: string;
    prompt: string;
    photo: string;
    blurData: string
  }[];

export type Post =
  {
    id: string;
    name: string;
    prompt: string;
    photo: string;
    blurData: string
  };

