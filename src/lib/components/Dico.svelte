<script>
  import { datas } from "@stores";
  import XLSX from "xlsx";

  let files;

  const reader = new FileReader();
  reader.onloadend = () => {
    const result = XLSX.read(reader.result, {
      type: "binary",
    });

    const name = result.SheetNames[0];
    const sheet = result.Sheets[name];
    const titles = Object.keys(sheet)
      .filter((c) => c.startsWith("A"))
      .reduce((a, key) => {
        a.push(sheet[key].v);
        return a;
      }, []);

    $datas.dico.titles = titles.slice(1);
  };

  $: {
    if (files?.[0]) reader.readAsBinaryString(files[0]);
  }
</script>

<label>
  <p>Charger un Dico</p>
  <input type="file" bind:files />
</label>

<style>
  label {
    display: block;
    border: 1px solid #ddd;
    border-radius: 1em;
    padding: 1em;
    width: 100%;

    text-align: center;
  }
</style>
