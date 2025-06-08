import PageBreadcrumb from "@/Components/DashComps/common/PageBreadCrumb";
import PageMeta from "@/Components/DashComps/common/PageMeta";
import CheckboxComponents from "@/Components/DashComps/form/form-elements/CheckboxComponents";
import DefaultInputs from "@/Components/DashComps/form/form-elements/DefaultInputs";
import DropzoneComponent from "@/Components/DashComps/form/form-elements/DropZone";
import FileInputExample from "@/Components/DashComps/form/form-elements/FileInputExample";
import InputGroup from "@/Components/DashComps/form/form-elements/InputGroup";
import InputStates from "@/Components/DashComps/form/form-elements/InputStates";
import RadioButtons from "@/Components/DashComps/form/form-elements/RadioButtons";
import SelectInputs from "@/Components/DashComps/form/form-elements/SelectInputs";
import TextAreaInput from "@/Components/DashComps/form/form-elements/TextAreaInput";
import ToggleSwitch from "@/Components/DashComps/form/form-elements/ToggleSwitch";


export default function FormElements() {
  return (
    <div>
      <PageMeta
        title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="From Elements" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <DefaultInputs />
          <SelectInputs />
          <TextAreaInput />
          <InputStates />
        </div>
        <div className="space-y-6">
          <InputGroup />
          <FileInputExample />
          <CheckboxComponents />
          <RadioButtons />
          <ToggleSwitch />
          <DropzoneComponent />
        </div>
      </div>
    </div>
  );
}
