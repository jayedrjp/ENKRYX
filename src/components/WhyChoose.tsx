import styled from "styled-components";

const CARDS = [
  {
    number: "01",
    title: "CUSTOM BUILT",
    description: "Designed around your needs.",
  },
  {
    number: "02",
    title: "SCALABLE",
    description: "Ready to grow with you.",
  },
  {
    number: "03",
    title: "SECURE",
    description: "Built with reliability in mind.",
  },
  {
    number: "04",
    title: "FUTURE READY",
    description: "Technology that moves forward.",
  },
];

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-top: 3.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  position: relative;
  overflow: hidden;
  isolation: isolate;
  min-height: 220px;
  padding: 2.25rem 1.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  border: 1px solid #dceaf0;
  border-radius: 20px;
  box-shadow: 0 1px 2px rgba(17, 17, 17, 0.03);

  &::before {
    content: "";
    position: absolute;
    left: -10%;
    bottom: -10%;
    width: 48px;
    height: 48px;
    background: #006f87;
    border-radius: 50%;
    transform: scale(0);
    transform-origin: center;
    transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 0;
  }

  &:hover::before {
    transform: scale(12);
  }
`;

const Number = styled.span`
  position: relative;
  z-index: 1;
  align-self: flex-end;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #5f7285;
  transition: color 0.4s ease;

  ${Card}:hover & {
    color: #ffffff;
  }
`;

const CardBody = styled.div`
  position: relative;
  z-index: 1;
`;

const Title = styled.h3`
  margin: 0 0 0.75rem;
  font-size: 1.0625rem;
  font-weight: 800;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #111111;
  transition: color 0.4s ease;

  ${Card}:hover & {
    color: #ffffff;
  }
`;

const Description = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.55;
  color: #5f7285;
  transition: color 0.4s ease;

  ${Card}:hover & {
    color: rgba(255, 255, 255, 0.9);
  }
`;

export default function WhyChoose() {
  return (
    <section className="py-24 bg-canvas overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <h2 className="text-center text-4xl font-extrabold italic tracking-tight uppercase text-[#111111]">
          Why Choose <span className="text-[#006e87]">ENKRYX</span>?
        </h2>
        <p className="text-center max-w-xl mx-auto mt-4 text-muted text-sm">
          We build smart, scalable systems that fit your business.
        </p>

        <Grid>
          {CARDS.map((card) => (
            <Card key={card.number}>
              <Number>{card.number}</Number>
              <CardBody>
                <Title>{card.title}</Title>
                <Description>{card.description}</Description>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </div>
    </section>
  );
}
