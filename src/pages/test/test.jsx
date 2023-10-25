function test() {
  return(
    <form action="http://localhost:8000/send_audio_to_speechsuper" method="POST" target="_blank">
      <input type="file" />
      <input type="text" value="carpet" />
      <input type="submit" value="send" />
    </form>
  );
}

export default test;