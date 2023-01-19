<script>
  import Dropzone from "svelte-file-dropzone";
  import toast from "svelte-french-toast"
  import { fade } from "svelte/transition";
  import { uploadPopup, Xpages, Xcurrent } from "$lib/stores.js";
  import ExcelJs from "exceljs";
  import Button from "./PopupBtn.svelte";

  let disabled = false;

  const close = () => {
    uploadPopup.set(false);
  }

  const parseExcel = wb => {
    return wb.map(table => {
      let { name } = table;

      table = table._rows.map(row => {
        return row._cells.map(cell => cell._value.model.value);
      });

      table =  table.map(r => {
        if (r[0].toLowerCase().startsWith("name")) return;
        let prob = r[1] == undefined ? 1 : r[1];
        return { name: r[0], prob, id: Math.random()}
      }).filter(n => n);

      return { name, table };
    });
  }
  
  const uploadFile = async ({ detail: { acceptedFiles } }) => {
    if (!acceptedFiles.length) return toast.error("Only .xlsx files are accepted. Try again...");
    
    disabled = true;
    const file = acceptedFiles[0];
    const wb = new ExcelJs.Workbook();

    await wb.xlsx.load(await file.arrayBuffer());

    Xpages.set(parseExcel(wb.worksheets));

    Xcurrent.set(-1);
    Xcurrent.set(0);

    uploadPopup.set(false);
  }
</script>

<button class="absolute inset-0 z-20 bg-black/30 grid place-items-center w-screen cursor-default" transition:fade={{duration:200}}>
  <div class="px-10 w-full">
    <div class="sm:w-[34rem] z-100 rounded-xl overflow-hidden text-left mx-auto">
      <div class="flex justify-between items-center px-6 py-4 text-xl text-white bg-blue-600">
        <h1>Upload - Import Names From Excel</h1>
        <button class="fa-solid fa-xmark hover:text-gray-200" on:click={close}></button>
      </div>
      <div class="py-4 px-[1.125rem] bg-white pointer-events-auto">
        <Dropzone accept=".xlsx" on:drop={uploadFile} {disabled}>
          <p>Drop your .xlsx file here!</p>
        </Dropzone>
        <div class="flex justify-end gap-4 mt-4">
          <Button text="Close" on:click={close} />
        </div>
      </div>
    </div>
  </div>
</button>