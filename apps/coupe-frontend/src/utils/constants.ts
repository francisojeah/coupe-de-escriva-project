export enum SportsType {
    FOOTBALL = 'football',
    BASKETBALL = 'basketball',
    VOLLEYBALL = 'volleyball',
  }

export  const getVideoId = (link: string): string => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
    const match = link.match(regex);
    if (match) {
      return match[1];
    }
    return "";
  };

export function formatDateWithoutTime(dateString: any) {
  const dateObject = new Date(dateString);
  const formattedDate = dateObject.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return formattedDate;
}

export const teamsList = [
  {
    title: "Blue Jays",
    logo: "/assets/images/blue-jays-logo.svg",
    label: "blue-jays",
    color: "#3F9CEC",
    textColor: "white",
    backgroundBanner: "/assets/images/blue-jays-background.png",
    players: [
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
    ]
  },
  {
    title: "Cirok",
    logo: "/assets/images/cirok-logo.svg",
    label: "cirok",
    color: "white",
    textColor: "black",
    backgroundBanner: "/assets/images/cirok-background.png",
    players: [
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
    ]
  },
  {
    title: "Madiba",
    logo: "/assets/images/madiba-logo.svg",
    label: "madiba",
    color: "black",
    textColor: "white",
    backgroundBanner: "/assets/images/madiba-background.png",
    players: [
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
    ]
  },
  {
    title: "TSG Walkers",
    logo: "/assets/images/tsg-logo.svg",
    label: "tsg-walkers",
    color: "#AA0F0D",
    textColor: "white",
    backgroundBanner: "/assets/images/tsg-background.png",
    players: [
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
    ]
  },
];