const fs = require('fs');

// Membuat folder jika belum ada
const dirpath = './data';
if (!fs.existsSync(dirpath)) {
  fs.mkdirSync(dirpath);
}

// Membuat file contacts.json jika belum ada
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf-8');
}

// Fungsi untuk memuat kontak dari data/contacts.json
const loadContacts = () => {
  const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

// Fungsi untuk mencari kontak berdasarkan nama
const findContact = (nama) => {
  const contacts = loadContacts();
  const contact = contacts.find((contact) => contact.nama === nama);
  return contact;
};

// Fungsi untuk menulis kontak baru ke file contacts.json
const saveContacts = (contacts) => {
  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
};

// Fungsi untuk menambahkan kontak baru
const AddContact = (contact) => {
  const contacts = loadContacts();

  contacts.push(contact);
  saveContacts(contacts);
};

// Fungsi untuk memeriksa duplikat nama
const cekDuplikatNama = (nama) => {
  const contacts = loadContacts();
  return contacts.find((contact) => contact.nama === nama);
};

// Fungsi hapus Kontak
const deleteContact = (nama) => {
  const contacts = loadContacts();

  const filteredContacts = contacts.filter((contact) => contact.nama !== nama);
  saveContacts(filteredContacts);
};

// Fungsi edit Kontak
const editContact = (contactBaru) => {
  const contacts = loadContacts();

  const filteredContacts = contacts.filter(
    (c) => c.nama !== contactBaru.oldNama
  );

  delete contactBaru.oldNama;
  filteredContacts.push(contactBaru);
  saveContacts(filteredContacts);
};

module.exports = {
  loadContacts,
  findContact,
  AddContact,
  cekDuplikatNama,
  deleteContact,
  editContact,
};
