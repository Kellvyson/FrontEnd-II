export interface Missionary {
  id: string;
  name: string;
  field: string;
  country: string;
  bio: string;
  imageUrl: string;
}

export interface Verse {
  id: string;
  reference: string;
  text: string;
}

export interface Letter {
  id: string;
  missionaryId: string;
  content: string;
  verse: Verse;
  senderName: string;
  date: string;
}

export interface Database {
  missionaries: Missionary[];
  verses: Verse[];
  letters: Letter[];
}
