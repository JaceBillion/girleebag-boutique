const all = [
  {'id': 'd35888f0-9c93-406c-bb05-537565e06104', 'created_at': '2026-04-13T04:24:55.221073+00:00', 'name': 'Jack Purple', 'email': 'Hey@jackpurplelegs.com', 'subject': 'Complaint', 'message': 'I do not like orange', 'archived': True}
];
const msgCurrentView = 'inbox';
const filtered = all.filter(function(m) { return msgCurrentView === 'inbox' ? !m.archived : m.archived; });
console.log("Filtered length:", filtered.length);
