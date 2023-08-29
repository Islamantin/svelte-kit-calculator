import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutLoad} */
export async function load({ url }) {
	if (url.pathname === '/') throw redirect(303, '/actions');
	return {};
}
