const { Command } = require("commander");
const program = new Command();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.log("Action: list");
      console.log("Lista kontaktów:", contacts);
      break;

    case "get":
      const contact = await getContactById(id);
      console.log("Action: get");
      console.log("Kontakt o ID", id, ":", contact);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log("Action: add");
      console.log("Dodano nowy kontakt:", newContact);
      break;

    case "remove":
      const isRemoved = await removeContact(id);
      console.log("Action: remove");
      if (isRemoved) {
        console.log("Kontakt o ID", id, "został usunięty.");
      } else {
        console.log("Kontakt o ID", id, "nie został znaleziony.");
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
