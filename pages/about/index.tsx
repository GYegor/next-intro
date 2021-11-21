import { NextPage } from "next";
import { MainLayout } from "../../layouts/MainLayout";

interface AboutProps {
  title: string;
}

const About: NextPage<AboutProps> = ({ title }) => {
  return (
    <MainLayout title="About">
      <h1>{title}</h1>
    </MainLayout>
  )
};

About.getInitialProps = async () => {
  const res = await fetch(`${process.env.BASE_API_URL}/about`);
  const data = await res.json();

  return {
    title: data.title
  }
}

export default About;
