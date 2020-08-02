import React, { useEffect, useState } from 'react'
import { Table } from 'evergreen-ui'
import { get } from 'axios'

const conf = {
  0: 'https://1drv.ms/u/s!Al_GOxp7elhTluRMAwqNF0Hs5CGepQ',
  1: 'https://1drv.ms/u/s!Al_GOxp7elhTluRPuaflXqAfxSL8EA'
}

export const Texts = ({ name }) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    ;(async () => {
      const uri = `https://api.onedrive.com/v1.0/shares/u!${btoa(conf[name])}/root?expand=children`
      const res = (await get(uri)).data
      setItems(
        res.children
          .filter(i => !i.name.includes('txt'))
          .map(i => ({
            name: 'notready',
            id: i.id,
            description: 'nahrává...',
            url: i['@content.downloadUrl']
          }))
      )
      res.children.forEach(async i => {
        if (res.children.filter(ii => ii.name === `${i.name}.txt`).length > 0) {
          const inner = res.children.find(ii => ii.name === `${i.name}.txt`)
          const description = (await get(inner['@content.downloadUrl'])).data
          setItems(items => [
            ...items.filter(ii => ii.id !== i.id),
            { name: 'ready', id: i.id, description, url: i['@content.downloadUrl'] }
          ])
        }
      })
    })()
  }, [name])

  return (
    <>
      <Table>
        <Table.Head>
          <Table.TextCell>Soubory</Table.TextCell>
        </Table.Head>
        <Table.Body>
          {items.map((i, index) => (
            <Table.Row key={i.id}>
              <Table.TextCell>{i.description}...</Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  )
}
