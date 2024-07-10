import { db } from '@/lib/db';
export async function getStore(id: string) {
  const store = await db.query.stores.findFirst({
    where: (stores, { eq }) => eq(stores.id, id),
    with: {
      billboards: true,
    },
  });

  return store;
}