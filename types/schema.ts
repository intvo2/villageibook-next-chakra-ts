export type User = {
  id: number;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  email: string;
  password: string;
  details?: {
    photos: string[]
  };
  desc?: string;
  comesFrom?: string;
  livesIn?: string;
  graduatedAt?: string;
  profession?: string;
  degree?: string;
  recentAt?: number;
  uuid: string;
  role?: string;
}

export type Country = {
  id: number;
  name: string;
  href: string;
  uuid: string;
}

export type Region = {
  id: number;
  name: string;
  href: string;
  uuid: string;
}

export type District = {
  id: number;
  name: string;
  href: string;
  uuid: string;
}

export type SubDistrict = {
  id: number;
  name: string;
  href: string;
  uuid: string;
}

export type Village = {
  id: number;
  name: string;
  href?: string;
  uuid?: string;
  img?: string;
  recentAt?: number;
}

export type University = {
  id: number;
  name: string;
  href: string;
  uuid: string;
}

export type Degree = {
  id: number;
  name: string;
};

export type Profession = {
  id: number;
  name: string;
};
