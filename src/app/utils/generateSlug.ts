// const generateSlug = (name: string): string => {
// 	return name
// 		.toLowerCase()
// 		.replace(/ /g, '-')
// 		.replace(/[^\w-]+/g, '');
// };

// export default generateSlug;

import slugify from 'slugify';

const generateSlug = (title: string): string => {
	return slugify(title, {
		lower: true,
		remove: /[*+~.()'"!:@]/g,
		replacement: '-',
		locale: 'bn'
	});
};

export default generateSlug;
