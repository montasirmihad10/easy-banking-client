import { useGetManagersQuery } from "@/redux/api/adminApi";
import EBForm from "@/shared/form/EBForm";
import EBSelect from "@/shared/form/EBSelect";
import { Button } from "../ui/button";
import { FieldValues } from "react-hook-form";
import { useUpdateBranchManagerMutation } from "@/redux/api/branchApi";
import SecondLoading from "@/shared/loading/SecondLoading";
import AuthLoading from "@/shared/loader/AuthLoading";
import { toast } from "sonner";
import { selectBranchManagerOptions } from "@/utils/selectOptions/useSelectOptions";

const UpdateBranchManager = ({
  id1,
  setOpen1,
}: {
  id1: string | null;
  setOpen1: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data: managerData, isLoading } = useGetManagersQuery(undefined);
  const [updateBranchManager, { isLoading: updateLoading }] =
    useUpdateBranchManagerMutation();
  const managers = managerData?.data;
  const managerOptions = selectBranchManagerOptions(managers);

  const onSubmit = async (data: FieldValues) => {
    try {
      const managerInfo = {
        id: id1?.toString(),
        data: {
          managers: Array.isArray(data.managers)
            ? data.managers
            : [data.managers],
        },
      };
      const res = await updateBranchManager(managerInfo);
      if (res?.data?.success) {
        toast.success("Branch Manager updated", { duration: 3000 });
        setOpen1(false);
      } else {
        toast.error("Update failed!", { duration: 4000 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <SecondLoading />;
  }

  return (
    <div>
      <EBForm onSubmit={onSubmit}>
        <EBSelect
          name="managers"
          label="Managers"
          options={managerOptions}
          className="w-full"
        />
        <div className="text-right">
          <Button className="mt-3 cursor-pointer" type="submit">
            {updateLoading ? <AuthLoading /> : "Submit"}
          </Button>
        </div>
      </EBForm>
    </div>
  );
};

export default UpdateBranchManager;
