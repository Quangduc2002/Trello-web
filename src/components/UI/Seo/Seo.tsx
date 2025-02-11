import { Helmet } from 'react-helmet';
interface ISeoProps {
  titlePage?: string;
}

const Seo = ({ titlePage = 'Trello' }: ISeoProps) => {
  return (
    <Helmet>
      <title>{titlePage}</title>
      <meta property='title' content={titlePage} />
      <meta itemProp='name' content={titlePage} />
      <link rel='icon' type='image/svg+xml' href='/Images/Logo.png' />
    </Helmet>
  );
};

export default Seo;
