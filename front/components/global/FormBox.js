import styles from "../../styles/Sign-In.module.css";

function FormBox({type, name}) {
    return (
        <div className={styles.field_box}>
            <label htmlFor={name} className={styles.form_text}>{name} :</label>
            <input required type={type} id={name} className={styles.form}/>
        </div>
    )
}

export default FormBox