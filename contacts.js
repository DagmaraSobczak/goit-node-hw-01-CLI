const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, { encoding: "utf8" });
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error("Błąd podczas odczytu kontaktów:", error);
    return [];
  }
}
async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    if (contacts.length === filteredContacts.length) return false;

    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    return true;
  } catch (error) {
    console.error("error", error);
    return false;
  }
}
async function addContact(name, email, phone) {
  try {
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    const contacts = await listContacts();
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
