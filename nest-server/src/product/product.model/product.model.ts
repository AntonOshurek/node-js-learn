export class ProductModel {
	image: string;
	title: string;
	price: number;
	oldPrice: number;
	credit: number;
	calculatedRating: number;
	description: string;
	advantages: string;
	disAdvantages: string;
	category: string[];
	tags: string;
	characteristics: {
		[key: string]: string;
	};
}
