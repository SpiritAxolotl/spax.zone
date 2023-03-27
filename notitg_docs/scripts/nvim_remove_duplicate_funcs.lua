local function get_funcs_from_lines(lines)
  local funcs = {}

  for _, line in pairs(lines) do
    if vim.startswith(line, "function ") then
      _, _, func_name = line:find(":([a-zA-Z0-9_]+)%(")
      table.insert(funcs, func_name)
    end
  end

  return funcs
end

local function main()
  if vim == nil or vim.api == nil then
    error("vim.api not detected - Are you using Neovim?")
  end

  if vim.fn == nil then
    error("vim.fn not detected - A newer build of Neovim is required (v0.5+)")
  end

  local other_buf = vim.fn.input("Other buffer number to compare (use `:ls` or `:echo bufnr()` to check buffer numbers): ")
  if other_buf == "" then
    print("Exiting (no number provided)")
    return
  end

  other_buf = tonumber(other_buf)

  local this_buf_lines = vim.api.nvim_buf_get_lines(0, 0, -1, true)
  local this_buf_funcs = get_funcs_from_lines(this_buf_lines)

  local other_buf_lines = vim.api.nvim_buf_get_lines(other_buf, 0, -1, true)
  local other_buf_funcs = get_funcs_from_lines(other_buf_lines)

  -- Look for duplicates
  local dupe_names = {}
  for _, this_func in pairs(this_buf_funcs) do
    for _, other_func in pairs(other_buf_funcs) do
      if this_func == other_func then
        table.insert(dupe_names, this_func)
      end
    end
  end

  -- Remove duplicates
  for i = #this_buf_lines - 1, 0, -1 do
    local line = this_buf_lines[i + 1]

    for _, dupe in pairs(dupe_names) do
      if vim.startswith(line, "function ") and line:find(":" .. dupe .. "%(") then
        vim.api.nvim_buf_set_lines(0, i, i + 1, true, {""})
      end
    end
  end

  print("Removed " .. #dupe_names .. " duplicates")
end

main()
