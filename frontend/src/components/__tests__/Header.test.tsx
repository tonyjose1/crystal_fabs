import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  it('renders the header and navigation links', () => {
    render(<Header />);

    const logo = screen.getByText('Crystal Fabs');
    expect(logo).toBeInTheDocument();

    const aboutLink = screen.getByText('About');
    expect(aboutLink).toBeInTheDocument();

    const productsLink = screen.getByText('Products');
    expect(productsLink).toBeInTheDocument();

    const servicesLink = screen.getByText('Services');
    expect(servicesLink).toBeInTheDocument();

    const industriesLink = screen.getByText('Industries');
    expect(industriesLink).toBeInTheDocument();

    const projectsLink = screen.getByText('Projects');
    expect(projectsLink).toBeInTheDocument();

    const contactLink = screen.getByText('Contact');
    expect(contactLink).toBeInTheDocument();
  });
});
