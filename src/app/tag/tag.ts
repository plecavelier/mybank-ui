export class Tag {

  '@id': string;
  id: number;
  name: string = '';
  description: string = '';
  icon: string;
  color: string;
  disabled: boolean = false;
  budgetYear: number;
  budgetAmount: number;
  budgetAmountInput: number = null;
  totalAmount: number;
  gap: number;
}
