import Wrapper from 'components/molecules/Wrapper/Wrapper';
import Header from 'components/organisms/Header/Header';
import Footer from 'components/organisms/Footer/Footer';



const ErrorPage = () => {

  return (
    <Wrapper>
      <Header title="Not connected 😢"/>
      <p className="lead">Ooops, it seems you don't have internet connection</p>
      <p>An active internet connection is needed to install EmuDeck</p>
    </Wrapper>
  );
};

export default ErrorPage;
