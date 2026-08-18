import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, role }) {
  return (
    <>
      <Header role={role} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
