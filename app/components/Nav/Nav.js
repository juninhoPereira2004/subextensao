"use client";

import Auth from "@/app/utils/auth";
import styles from "./nav.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiGet } from "@/app/utils/api";
// import ModalNotificacao from "@/app/components/ModalNotificacao/ModalNotificacao";

export default function Nav() {
  const userInfo = Auth.getUser();
  const router = useRouter();
  const [qtnotifis, setQtnotifis] = useState(0);
  const [showModal, setShowModal] = useState(false); // Controla a exibição do modal

  const handleLogout = () => {
    Auth.logout();
    router.push("/page/login");
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <nav className={styles.nav}>
        {/* <img src="./../logo.png" width={150} alt="Logo" />     */}
        <ul>
          <li>
            <a href="/page/dashboard">Dashboard</a>
          </li>
          {userInfo?.role === "Administrador" && (
            <>
              <li>
                <a href="/page/usuarios">Profissão</a>
              </li>
            </>
          )}
        </ul>
        <div className={styles.footer}>
          <div
            className="position-relative me-3"
            style={{ cursor: "pointer" }}
            onClick={handleShowModal} // Abre o modal
          >
          </div>
          <hr />
          <span className={styles.userInfo}>Bem-vindo, {userInfo?.nome}!</span>
          <hr />
          <button className={styles.logoutButton} onClick={handleLogout}>
            Sair
          </button>
        </div>
      </nav>

      {/* Modal Notificações */}
      {/* {showModal && (
        <ModalNotificacao
          userId={userInfo?.id}
          onClose={handleHideModal} // Fecha o modal
        />
      )} */}
    </>
  );
}
