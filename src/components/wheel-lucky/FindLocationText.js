export default function FindLocationText({
    width,
    initialValues,
    CenterDistance
}) {
    const slicesCount = initialValues.length;

    const ChuViLon = width / 2;
    const ChuViNho = CenterDistance;
    const ChuViVuong = 180;

    const DoXoayCoBan = 360 / slicesCount;

    let DoXoay = DoXoayCoBan / 2;

    function start_values() {
        for (let i = 0; i < initialValues.length; i++) {
            initialValues[i].x = getPositionX(i, ChuViNho);
            initialValues[i].y = getPositionY(i, ChuViNho);
            initialValues[i].rotation = getRotation(i);

            initialValues[i].x_i = getPositionX(i, ChuViVuong);
            initialValues[i].y_i = getPositionY(i, ChuViVuong);
            initialValues[i].rotation_i = getRotation(i);
            initialValues[i].width_i = 50;
            initialValues[i].height_i = 50;
        }
    }

    const getPositionX = (index, ChuVi) => {
        let ToaDo = ChuViLon + ChuVi * Math.cos((getRotation2(index)));
        return ToaDo;
    };

    const getPositionY = (index, ChuVi) => {
        let ToaDo = ChuViLon + ChuVi * Math.sin((getRotation2(index)));
        return ToaDo;
    };

    const getRotation = (index) => {
        return DoXoay + index * DoXoayCoBan - 90;
    };

    const getRotation2 = (index) => {
        let Xoay = 0;
        let XuLy = initialValues.length - 5;
        for (let j = 0; j <= index; j++) {
            Xoay += DoXoayCoBan;
        }
        XuLy = 130 - XuLy * 4;
        if (slicesCount >= 8) {
            XuLy += (slicesCount - 8) * 2;
        }
        return (Xoay - XuLy) * Math.PI / 180;
    };

    start_values();

    return initialValues;
}