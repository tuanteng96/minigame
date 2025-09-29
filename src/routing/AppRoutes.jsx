import Root from "@/layout/Root";
import Wheels from "@/pages/Wheels";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import SuspensedView from "./SuspensedView";
import { lazy } from "react";

const Wheel1Page = lazy(() => import("@/pages/Wheels/Wheel1/Wheel1"));
const Preview1Page = lazy(() => import("@/pages/Wheels/Wheel1/Preview1"));
const WheelViewPage = lazy(() => import("@/pages/Views/WheelView"));
const LuckyGiftBoxPage = lazy(() => import("@/pages/LuckyGiftBox"));
const GiftBoxIdPage = lazy(() => import("@/pages/GiftBoxId"));
const RotationLuckId = lazy(() => import("@/pages/RotationLuckId"));

function AppRoutes() {
  return (
    <BrowserRouter basename="/minigame/">
      <Routes>
        <Route element={<Root />}>
          <Route index element={<WheelViewPage />} />
          <Route path="wheel" element={<Wheels />}>
            <Route index element={<Navigate to="1" />} />
            <Route path="1">
              <Route
                index
                element={
                  <SuspensedView>
                    <Wheel1Page />
                  </SuspensedView>
                }
              />
              <Route
                path="preview"
                element={
                  <SuspensedView>
                    <Preview1Page />
                  </SuspensedView>
                }
              />
            </Route>
          </Route>
          <Route path="vong-quay" element={<RotationLuckId />} />
          <Route path="vong-quay-may-man" element={<WheelViewPage />} />
          <Route path="hop-qua" element={<LuckyGiftBoxPage />} />
          <Route path="hop-qua-bi-an" element={<GiftBoxIdPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
