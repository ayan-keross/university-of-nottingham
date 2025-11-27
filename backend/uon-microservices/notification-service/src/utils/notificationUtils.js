export async function notifyUser(userId, notification) {
  console.log(`🔔 Notify User ${userId}:`, notification.message);

  // Socket.io direct push
  if (global.io) {
    global.io.to(userId).emit("notification", notification);
  }

  return true;
}

export async function notifyRole(role, notification) {
  console.log(`🔔 Notify Role ${role}:`, notification.message);

  // Fetch users dynamically from DB
  const users = await getUsersByRole(role); // implement this in your system

  users.forEach(u => {
    notifyUser(u.id, notification);
  });

  return users.map(u => u.id);
}
