import Button from '../components/Button';
import { Content, Section } from '../components/Section';

export default function NotFound() {
  return (
    <Section>
      <Content className="notfound">
        <span className="tag">404</span>
        <h1>Page not found</h1>
        <p>The page you are looking for doesn’t exist or has been moved.</p>
        <Button to="/" variant="dark">Back to Home</Button>
      </Content>
    </Section>
  );
}
