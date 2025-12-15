import { useEffect, useState } from "react";
import {
  getUsers,
  updateUserRole,
  blockUser, // Usaremos esta función para la eliminación/desactivación
  type User,
} from "../../api/users";
// Importamos Trash2 para el botón de eliminar
import { Users, User as UserIcon, Shield, Lock, Unlock, Mail, Loader2, ArrowLeftRight, Trash2 } from "lucide-react";

const ROLES = {
    USER: 'user',
    ADMIN: 'admin'
};

export default function UserAdmin() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
        const res = await getUsers();
        setUsers(res.data);
    } catch (error) {
        console.error("Error al cargar usuarios:", error);
        alert("Error al cargar la lista de usuarios.");
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const changeRole = async (id: number, currentRole: string) => {
    const newRole = currentRole === ROLES.USER ? ROLES.ADMIN : ROLES.USER;
    
    if (confirm(`¿Estás seguro de cambiar el rol del usuario ${id} a "${newRole.toUpperCase()}"?`)) {
        try {
            await updateUserRole(id, newRole);
            loadUsers();
        } catch (error) {
            console.error("Error al cambiar rol:", error);
            alert("Error al actualizar el rol del usuario.");
        }
    }
  };

  // Renombramos la función para clarificar su uso como "Eliminar" (bloquear/desactivar)
  const handleDeleteUser = async (id: number, isActive: boolean) => {
    const actionText = isActive ? "Bloquear/Desactivar" : "Desbloquear/Reactivar";
    
    if (confirm(`⚠️ ¿Estás seguro de ${actionText} la cuenta del usuario ${id}?`)) {
        try {
            // Utilizamos blockUser para esta acción, asumiendo que es la función de "eliminar" o "desactivar"
            await blockUser(id); 
            loadUsers();
        } catch (error) {
            console.error(`Error al ${actionText.toLowerCase()} usuario:`, error);
            alert(`Error al ${actionText.toLowerCase()} el usuario.`);
        }
    }
  };

  if (loading) {
    return (
        <div className="admin-content-page loading-message-container">
            <Loader2 size={24} className="animate-spin text-primary" />
            <p>Cargando usuarios...</p>
        </div>
    );
  }

  return (
    <div className="admin-content-page">
      <h1 className="dashboard-header-title">
        <Users size={30} className="header-icon"/> Gestión de Usuarios ({users.length})
      </h1>
      
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '5%' }}>ID</th>
              <th style={{ width: '25%' }}>Nombre</th>
              <th style={{ width: '25%' }}>Email</th>
              <th style={{ width: '15%' }}>Rol</th>
              <th style={{ width: '15%' }}>Estado</th>
              <th style={{ width: '15%' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td><UserIcon size={16} className="table-icon inline-icon"/> {u.name}</td>
                <td><Mail size={16} className="table-icon inline-icon"/> {u.email}</td>
                <td className={`role-${u.role}`}>
                    {u.role === ROLES.ADMIN ? (
                        <><Shield size={16} className="inline-icon role-admin-icon"/> ADMINISTRADOR</>
                    ) : (
                        <>{u.role}</>
                    )}
                </td>
                <td className={u.active ? "status-active" : "status-blocked"}>
                    {u.active ? "Activo" : "Bloqueado"}
                </td>
                <td>
                  <div className="actions-group">
                    {/* 1. Botón de Cambio de Rol */}
                    <button 
                        onClick={() => changeRole(u.id, u.role)} 
                        className={`btn-action-role ${u.role === ROLES.ADMIN ? 'to-user' : 'to-admin'}`}
                        title={u.role === ROLES.USER ? "Hacer Administrador" : "Quitar Permiso de Admin"}
                    >
                        <ArrowLeftRight size={16} />
                    </button>

                    {/* 2. Botón de Bloqueo/Desbloqueo (Eliminación Lógica) */}
                    <button 
                        onClick={() => handleDeleteUser(u.id, u.active)} 
                        className={`btn-action-block ${u.active ? 'btn-action-delete' : 'btn-action-unlock'}`}
                        title={u.active ? "Bloquear/Desactivar Usuario" : "Desbloquear/Reactivar Usuario"}
                    >
                        {u.active ? <Lock size={16} /> : <Unlock size={16} />}
                    </button>
                    
                    {/* 3. Botón de Eliminación (Solo si implementas delete/permanente) */}
                    {/*
                    <button 
                        onClick={() => {/* Lógica de eliminación permanente * /}}
                        className="btn-action-delete"
                        title="Eliminación Permanente"
                    >
                        <Trash2 size={16} />
                    </button>
                    */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}