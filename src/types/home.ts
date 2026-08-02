export interface WelcomeData {
  title: string;
  paragraphs: string[];
  mayor: {
    name: string;
    role: string;
  };
}

export interface HomeData {

  welcome: WelcomeData;

}