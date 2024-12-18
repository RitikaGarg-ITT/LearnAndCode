const CO2_EMISSIONS: { [key: string]: number } = {
  inbox: 0.02,
  sent: 0.05,
  spam: 0.01,
};

const emailData: { [key: string]: number } = {
  inbox: 500,
  sent: 200,
  spam: 100,
};

interface Entity {
  email: string;
}

interface CarbonFootprint {
  emailId: string;
  source: string;
  inbox: string;
  sent: string;
  spam: string;
}

function getCarbonFootprint(entityType: string[], entity: Entity): CarbonFootprint {
  const carbonFootprint: CarbonFootprint = {
    emailId: entity.email,
    source: "gmail",
    inbox: (emailData.inbox * CO2_EMISSIONS.inbox).toFixed(2) + " KG",
    sent: (emailData.sent * CO2_EMISSIONS.sent).toFixed(2) + " KG",
    spam: (emailData.spam * CO2_EMISSIONS.spam).toFixed(2) + " KG",
  };
  return carbonFootprint;
}

const entityType: string[] = ["email", "server", "something"];
const entity: Entity = {
  email: "ritikagarg@gmail.com",
};
const result = getCarbonFootprint(entityType, entity);
console.log(result);
