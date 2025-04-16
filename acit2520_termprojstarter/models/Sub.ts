export {};
type Sub = {
    name: string;
  };
  
  const subs: Sub[] = [];
  
  export default {
    findOne: (filter: { name: string }) => {
      return subs.find((s) => s.name === filter.name);
    },
    create: (sub: Sub) => {
      subs.push(sub);
      return sub;
    },
    getAll: () => subs,
  };
  