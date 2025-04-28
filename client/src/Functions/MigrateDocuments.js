import { db } from '../config/Config';

async function migrateDocuments(sourceCollection, destinationCollection, fieldToCheck, fieldValueToMigrate) {
  const sourceSnapshot = await db.collection(sourceCollection).where(fieldToCheck, '==', fieldValueToMigrate).get();

  if (sourceSnapshot.empty) {
    console.log('No documents found to migrate.');
    return;
  }

  const batch = db.batch();
  const destinationCollectionRef = db.collection(destinationCollection);

  const promises = [];

  for (const doc of sourceSnapshot.docs) {
    const data = doc.data();
    data.quantity = 1;

    const destinationDocRef = destinationCollectionRef.doc(doc.id);

    const destinationDocSnapshot = await destinationDocRef.get();

    if (destinationDocSnapshot.exists) {
      const currentQuantity = destinationDocSnapshot.data().quantity || 0;
      data.quantity = currentQuantity + 1;
    }

    batch.set(destinationDocRef, data);

    promises.push(destinationDocRef);
  }

  await Promise.all(promises.map(async (docRef) => await docRef.get()));

  await batch.commit();

  console.log('Documents migrated successfully.');
}

// Example usage:
// const sourceCollection = 'sourceCollection';
// const destinationCollection = 'cart';
// const fieldToCheck = 'fieldName';
// const fieldValueToMigrate = 'desiredFieldValue';

export default migrateDocuments;
