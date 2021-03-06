@notebooks.each do |notebook|
  note_count = notebook.notes.length

  json.set! notebook.id do
    json.extract! notebook, :id, :title, :author_id, :created_at, :updated_at, :defaultNotebook
    json.note_count note_count
  end
end
