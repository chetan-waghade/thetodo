export const getCategoryName = number => {
  switch (number) {
    case 'one':
      return 'personal';
    case 'two':
      return 'work';
    case 'three':
      return 'important';
  }
};
