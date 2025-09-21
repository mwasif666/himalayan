"use client";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import CheckoutDetail from "./CheckoutDetail";
import styles from "../../../style/Modal.module.css";

const CheckoutDetailModal = ({ open, setOpen, product }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={styles.checkoutModal}>
        <CheckoutDetail product={product}/>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDetailModal;